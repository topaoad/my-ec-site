import Link from 'next/link'
import { listProducts } from '@/app/libs/microcms';
import { Suspense } from 'react'
import { Pagination } from '@/app/components/layouts/Pagenation'
import Image from 'next/image'


export async function Products({ offset }: { offset?: number }) {
  const { contents: products, ...args } = await listProducts()
  const { totalCount, limit } = args
  console.log(args)
  console.log(products)
  return (
    // <Suspense fallback={<div>Loading中・・・</div>}>
    <>
      <div className="grid md:grid-cols-3 gap-10 p-5">
        {products.map((product) => {
          return (
            <section key={product.id} className='bg-white pb-10 rounded-lg dark:text-blue-700'>
              {product.image ? (
                <Link href={`/products/${product.id}`}>
                  <div className="relative w-full h-48">
                    <Image
                      src={product.image.url}
                      alt={`Product image of ${product.title}`}
                      // fillで代替
                      // width={product.image.width}
                      // height={product.image.height}
                      fill
                      className='rounded-t-lg object-cover'
                    />
                  </div>
                </Link>
              ) : null}
              <div className='px-10 mt-5'>
                <h2 className='text-xl font-bold'>
                  {/* <Link href={`/products/${product.id}`}>{product.name}</Link> */}
                </h2>

                <form action={`/api/${product.id}/checkout`} method='POST'>
                  <p className='flex justify-between my-2 items-center'>
                    <span>
                      {product.price.toLocaleString()} {product.inventory}
                    </span>

                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Buy now
                    </button>
                  </p>
                  <input type='hidden' name='amount' value={product.price} />
                  <input type='hidden' name='email' value="sample@gmail.com" />
                  {/* <input type='hidden' name='currency' value={product.currency} /> */}
                  {/* <input type='hidden' name='name' value={product.name} /> */}
                  {product.image ? (
                    <input type='hidden' name='image' value={product.image.url} />
                  ) : null}
                </form>
              </div>
            </section>
          )
        })}
      </div>
      <Pagination totalCount={totalCount} limit={limit} />
      {/* </Suspense > */}
    </>

  )
}
