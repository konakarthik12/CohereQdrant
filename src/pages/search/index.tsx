import useSWR from 'swr';
import {useRouter} from "next/router";
import React, {useRef} from 'react';
import Link from 'next/link';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function Home() {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)

  const {query} = router.query
  const {data} = useSWR(`/api/search?q=${query}`, fetcher)
  if (!data) return <div>Loading...</div>
  const search = async () => {
    if (ref.current) {
      const value = ref?.current?.value
      if (value) {
        await router.push(`/search/${value}`)
      }
    }
  }
  return <div className="flex flex-col min-h-screen">
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                </svg>
              </a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Scoper</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/search'}>Search</Link></li>
          <li><Link href={'/generate'}>Generate</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
      </div>
    </div>
    <div className="flex bg-base-200 flex-grow">
      <div className="flex flex-col text-center flex-grow">
        <div className="flex-grow self-center max-w-screen-lg mx-4">

          <p className="text-2xl py-6">Search all documents</p>
          <div className="input-group justify-center">

            <input ref={ref} type="text" placeholder="Search…" className="input input-bordered"
                   defaultValue={query}/>
            <button className="btn btn-square" onClick={search}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 my-4"> {data.hits.map((item, index) =>
            <div className="card bg-base-100 shadow-xl" key={index}>
              <div className="card-body">
                <h2 className="card-title self-center">{item.payload.meta.source} <span
                  className="badge badge-primary">{capitalizeFirstLetter(item.payload.meta.classification)}</span>
                  {item.payload.meta.finished === "finished" && <span className="badge badge-success">Finished</span>}
                  {item.payload.meta.finished === "unfinished" &&
                      <span className="badge badge-warning">In Progress</span>}
                </h2>
                <p className="mb-4">Relevant Sentence: <span>{item.payload.text}</span></p>
                <div className="card-actions justify-between items-center">
                  <div className="flex items-center">
                    <span className="badge pr-2">{(item.score * 100).toFixed()}% Match</span>

                  </div>
                  <Link href={"/view_doc/" + item.payload.meta.source}>
                    <button className="btn btn-primary">View Document</button>
                  </Link>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}
