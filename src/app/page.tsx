import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-black">
      <h1 className="p-5 font-bold text-3xl">NFC Reader</h1>
      <div className="justify-center items-center flex-row sm:flex">
        <Link href="/read">
          <div className="p-2 m-4 w-64 h-44 text-2xl font-semibold rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900  flex items-center justify-center">Read</div>
        </Link>
        <Link href="/write">
          <div className="p-2 m-4 w-64 h-44 text-2xl font-semibold rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-900  flex items-center justify-center">Write</div>
        </Link>
      </div>
    </div>
  );
}
