import React, {useRef, useState} from 'react';
import Link from 'next/link';

export default function Home() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  console.log(text)
  const generate = async () => {
    if (ref.current) {
      const value = ref?.current?.value
      if (value) {
        setLoading(true)
        const data = await fetch(`api/generate?q=${value}`)
        const json = await data.json()
        setText(json.document)
        setLoading(false)
      }
    }
  }
  const downloadFile = async () => {
    const blob = new Blob([text], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "user-info.md";
    link.href = url;
    link.click();
  };
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
    <div className="bg-base-200 flex-grow text-slate-200">
      <div className="flex flex-col mt-4">
        <div className="max-w-4xl self-center text-center">
          <h1 className="text-5xl font-bold">Scoper</h1>
          <p className="py-6">Generate New Document</p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">What would you like to generate?</span>
            </label>
            <textarea ref={ref} className="textarea textarea-bordered min-w-[600px] h-24 placeholder-slate-500   "
                      placeholder="Ex: Generate a project proposal for using rebar"></textarea>
            <button className="btn btn-primary mt-4" onClick={generate}>Generate</button>

          </div>
          {loading && <div className="mt-4">
              <span>Generating Document</span>
              <div className="mt-4 border border-2 rounded p-4 bg-base-100 min-h-[300px]">
                  <span className="pr-4">Loading Document</span>

                  <progress className="progress progress-secondary w-56"></progress>
              </div>
          </div>}
          {text && <div className="mt-4">
              <span>Generated Document: </span>
              <div className="mt-4 border border-2 rounded p-4 bg-base-100">{text}</div>
              <button className="btn btn-primary mt-2" onClick={downloadFile}>Download</button>
          </div>}
        </div>
      </div>
    </div>
  </div>
}
