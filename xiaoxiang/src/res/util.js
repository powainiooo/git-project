export const promisify = api => {
   return (options, ...params) => {
      return new Promise((resolve, reject) => {
         const extras = {
            success: resolve,
            fail (err) {
               console.log(err)
               reject(err)
            }
         }
         api({...options, ...extras}, ...params)
      })
   }
}
