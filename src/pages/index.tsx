import {useRef} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Home() {
  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()
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
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/search/'}>Search</Link></li>
            <li><Link href={'/generate'}>Generate</Link></li>
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
    <div className="hero bg-base-200 flex-grow">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Scoper</h1>
          <p className="py-6">Search all documents</p>
          <div className="input-group justify-center">
            <input ref={ref} type="text" placeholder="Search…" className="input input-bordered"/>
            <button className="btn btn-square" onClick={search}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
