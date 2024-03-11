import { BookOpenIcon } from '@heroicons/react/outline'

function DailyRead() {
  return (
    <div
      className="bg-white min-w-fit w-[50%] max-w-[20rem] p-4 rounded-xl 
                 shadow-md"
    >
      <p className="font-medium text-xl">Daily Read</p>
      <p>New rules in the dose of medicines to be consumed.</p>
      <div className="flex justify-around">
        <BookOpenIcon className="w-16" />
        <BookOpenIcon className="w-16" />
        <BookOpenIcon className="w-16" />
      </div>
    </div>
  )
}

export default DailyRead
