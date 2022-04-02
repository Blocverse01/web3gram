import joshdamian from "./images/joshdamian.png";
import { Outlet, useMatch, useResolvedPath } from "react-router-dom";
import CustomLink from "./components/CustomLink";
import Tilt from "react-parallax-tilt";

function Layout() {
  let resolved = useResolvedPath("/");
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div className="text-white leading-normal bg-gradient">
      <aside
        className={`${
          match ? "rounded-bl-[110px]" : "sticky top-0"
        } md:fixed md:rounded-bl-none md:inset-0 z-50 md:w-36 bg-[#000000]`}
        data-aos="fade-right"
      >
        <div
          className={`${
            match
              ? "py-8 flex-col"
              : "py-2 flex-row items-center border-b border-slate-600 justify-start"
          } px-5 md:py-8 md:flex-col flex gap-x-[20px] gap-y-[20px] md:border-b-0 md:items-start`}
        >
          <Tilt>
            <img
              src={joshdamian}
              alt="josh"
              className={`${
                match ? "w-[160px] mx-auto" : "w-[45px]"
              } rounded-full md:mx-auto  md:w-full`}
            />
          </Tilt>
          <div>
            <h3
              className={`text-white font-semibold ${
                match ? "text-[25px] text-center" : "text-[17px]"
              } md:text-center`}
            >
              Josh
            </h3>
            <h3
              className={`text-portfolio-gray mt-1 text-[14px] ${
                match ? "text-center" : ""
              } md:text-center`}
            >
              Software Developer
            </h3>
          </div>
        </div>
        <div className="flex fixed bottom-0 h-[47px] z-50 md:h-auto bg-black right-0 left-0 md:relative flex-row items-center md:items-start md:flex-col overflow-x-auto divide-y divide-x md:divide-x-0 md:pt-6 divide-slate-400">
          <CustomLink
            to="/"
            className="text-slate-300 w-1/3 md:w-full hover:text-portfolio-skyblue hover:font-bold transition-all duration-1000 ease-in-out border-t border-slate-400 flex flex-shrink-0 items-center px-3 h-[inherit] md:py-4 justify-center"
          >
            Home
          </CustomLink>
          <CustomLink
            to="/about"
            className="text-slate-300 w-1/3 md:w-full flex items-center h-[inherit] hover:text-portfolio-skyblue hover:font-bold transition-all duration-1000 ease-in-out  justify-center flex-shrink-0 py-2 md:py-4 px-3"
          >
            About
          </CustomLink>
          <CustomLink
            to="/contact"
            className="text-slate-300 w-1/3 md:w-full h-[inherit] flex items-center justify-center py-2 md:py-4 hover:text-portfolio-skyblue hover:font-bold transition-all duration-1000 ease-in-out flex-shrink-0 px-3"
          >
            Contact
          </CustomLink>
          <button className="hidden md:block w-full"></button>
        </div>
      </aside>
      <main className="md:ml-36 text-[#515152] pb-[48px] md:pb-0 bg-[#000000]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
