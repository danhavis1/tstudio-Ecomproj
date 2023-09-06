import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from '../components'
import {
  Home,
  Collections,
  Categories,
  ProductDetails,
  Bag,
  Checkout,
} from '../pages'

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'collections',
          element: <Collections />,
          children: [
            {
              path: ':collectionName',
              element: <Categories />,
            },
            {
              path: ':collectionName/:slug',
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: 'bag',
          element: <Bag />,
        },
        {
          path: 'checkout',
          element: <Checkout />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
