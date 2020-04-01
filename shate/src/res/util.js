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

export const getLength = str => {
   let realLength = 0, len = str.length, charCode = -1;
   for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
   }
   return realLength;
}
