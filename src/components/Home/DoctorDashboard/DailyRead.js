import { BookOpenIcon } from '@heroicons/react/outline'

function DailyRead() {
  return (
    <div
      className="bg-white min-w-fit w-[50%] max-w-[20rem] p-4 rounded-xl 
      shadow-md"
    >
      <div className="flex gap-2 items-center">
        <p className="font-medium text-3xl mr-2">Daily Read</p>
        <BookOpenIcon className="w-16" />
      </div>
      <p className="text-xl">
        New rules in the dose of medicines to be consumed.
      </p>
      <div className="flex justify-around gap-4 text-lg mt-4">
        <div className="flex flex-col gap-2 items-center">
          <img
            src="https://books.google.com/books/content?id=RjY2iwqIuIwC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE73uC2OVJBE5bGcu8rxuLMSSpFFsB-nfzOL5TbXA4ysgfX6W2oCOSAQOGnharJ96Wis9ujpsm1dpZ6hCKuAHYRH0o9XauquLAXUSe6-bpW8gN94lkpfmXYh64SJaqvy9K8RGPkNM"
            className="w-24 h-32"
            alt="A book cover"
          />
          <a href="https://amazon.com/dp/B003JTHWGE?ref=KC_GS_GB_US">
            How Doctors Think
          </a>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <img
            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTN965FmVdI2hHJMQy2gZf5sbL5v3cTdkXbAaXult0Xlm9lziUJmLJmpZUsE6QiprPKzhm-I-BbHjpZIxmP0ZJ9JPWvkIa8WwqRKQTyur4&usqp=CAc"
            className="w-24 h-32"
            alt="A book cover"
          />
          <a href="https://www.google.com/aclk?sa=l&ai=DChcSEwicioKizr6FAxW5hVoFHVoGDeMYABAHGgJ2dQ&ase=2&gclid=CjwKCAjwt-OwBhBnEiwAgwzrUpWHKha8Rs6W3zeNhy8B5FJNP7861IysIR8KmhPPx28UbM2SdxjKiRoCj6oQAvD_BwE&sig=AOD64_2bxKNgIKRegcUztfhMRHJI9JHeCg&ctype=5&q=&nis=4&ved=2ahUKEwir4fyhzr6FAxWCjLAFHXVLBzAQ9aACKAB6BAgBEA0&adurl=">
            Encyclopedia of Endocrine Diseases
          </a>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <img
            src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTUgV53-SXmfHWflkH4IrtObrnFN-I609-g0f5UmqitKf3QL6y9W7r4oo8E_czqrwscQqlI5qF4TLaoxHNICunfKgcl73fEaEPvd4sqZo-j&usqp=CAc"
            className="w-24 h-32"
            alt="A book cover"
          />
          <a href="https://www.google.com/aclk?sa=l&ai=DChcSEwicioKizr6FAxW5hVoFHVoGDeMYABAFGgJ2dQ&ase=2&gclid=CjwKCAjwt-OwBhBnEiwAgwzrUhMSBFa6P00LgSv4u8UYt0Tyc8-vtSAUNocZB4GLaiHk646D7OjjgBoCMg0QAvD_BwE&sig=AOD64_1k2KeGnGoYM1Oux-YNyDGYvpfPAg&ctype=5&q=&nis=4&ved=2ahUKEwir4fyhzr6FAxWCjLAFHXVLBzAQ9aACKAB6BAgBEBQ&adurl=">
            Fischer's Mastery of Surgery
          </a>
        </div>
      </div>
    </div>
  )
}

export default DailyRead
