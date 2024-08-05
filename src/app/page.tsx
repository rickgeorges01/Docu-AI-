import {UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {auth} from "@clerk/nextjs/server";
import Link from "next/link";
import {LogIn} from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
    // Checking if the user is signed in by calling the auth function to get the user ID
    const {userId} = await auth()
    // Converting the user ID to a boolean to check authentication
    const isAuth = !! userId
  return (
      <div className="w-screen min-h-screen bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className=" flex flex-col items-center text-center">
                <div className="flex items-center">
                    <h1 className="mr-3 text-5xl font-semibold">Would you like to chat we any PDF?</h1>
                    {/*this user button will only show when you're signed in*/}
                    <UserButton afterSignOutUrl="/"/>
                </div>
                <div className=" flex mt-2">
                    {/* Show 'Go to chats' button only if authenticated */}
                    {isAuth && (<Button> Go to chats</Button>)}
                </div>
                <p className="max-w-xl mt-1 text-lg">
                    Join millions of students, researcher and professionals to
                    instanly answer questions and understand research with AI
                </p>
                <div className=" w-full mt-4">
                    {isAuth ? <FileUpload/>:(
                        <Link href="/sign-in">
                            <Button>
                                Login to get Started !
                                <LogIn className="w-4 h-4 ml-2"/>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
      </div>
  )
}
