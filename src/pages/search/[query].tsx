import useSWR from 'swr';
import {useRouter} from "next/router";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())
export default function Home() {
  const router = useRouter()
  const {query} = router.query
  const {data} = useSWR(`/api/search?q=${query}`, fetcher)
  if (!data) return <div>Loading...</div>
  console.log(data.hits)
  return <div className="flex flex-col min-h-screen">
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered"/>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="profile" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex bg-base-200 flex-grow">
      <div className="flex flex-col text-center flex-grow">
        <div className="flex-grow self-center max-w-screen-lg">

          <p className="text-2xl py-6">Search all documents</p>
          <div className="input-group justify-center">
            <input type="text" placeholder="Search…" className="input input-bordered" defaultValue={query}/>
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 my-4"> {data.hits.map((item) => {
            return <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title self-center">{item.payload.meta.source}</h2>
                <p>Relevant Sentence: <span>{item.payload.text}</span></p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Document</button>
                </div>
              </div>
            </div>
          })
          }
          </div>
        </div>
      </div>
    </div>
  </div>
}
