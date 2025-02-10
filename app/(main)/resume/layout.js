import { Suspense } from "react";
import {PropagateLoader} from "react-spinners"
const Layout = ({ children }) => {
  return <div className="px-5">
    {/* <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Build Your Resume</h1>
    </div> */}
    <Suspense fallback={<PropagateLoader className="mt-4" width={"100%"} color="gray"/>}>
    {children}
    </Suspense>
    </div>;
};

export default Layout;
