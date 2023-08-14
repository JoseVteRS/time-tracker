import { getUserSession } from "@/lib/auth"
import Image from "next/image"

export default async function ProfilePage() {
  const user = await getUserSession()

  return (
    <div>
      <h1 className="text-3xl mb-8">Profile</h1>
      <div className="flex">
        <div className="flex-grow flex-col flex gap-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <div>
            <h3 className="font-semibold">Name</h3>
            <div >{user.name}</div>
          </div>

          <div>
            <h3 className="font-semibold">Email</h3>
            <div >{user.email}</div>
          </div>
        </div>
        <div className="w-[150px] ">
          <h2 className="text-lg font-semibold mb-4">Profile picture</h2>
          <Image
            className="rounded-full"
            alt="Profile picture" width={150} height={150} src={user.image} />
          <span className="text-neutral-600 text-sm">If you&apos;d like to change your profile picture, you can edit it on{' '}
            <a
              className="text-blue-600 hover:underline"
              href="http://myaccount.google.com/profile/photo/edit" target="_blank" rel="noopener noreferrer">Google here</a>
          </span>
        </div>

      </div>
    </div>
  )
}