import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { Home } from "./Pages/Home";

const router =createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/trad",
        element:<FetchOld/>
      },
      {
        path:"/rq",
        element:<FetchRQ/>
      },
    ],
  },
  
]);
const App=()=>{
  return (
    <RouterProvider router={router} />
  );
}

export default App;