import {authMiddleware} from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes:["/"],
});

//This config that specifies the matcher whom  is a tool or component that decides whether a certain condition is met or not.
//matcher is basically a bunch of regex to specify when this middleware should run
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
