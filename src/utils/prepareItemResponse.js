const prepareItemResponse = (o) => {
  return ({
      vendor_code: o.data[0].vendor_code,
      variants: [
          ...o.data[0].type.map((elem, index
          ) => ({ images: {...elem, urls: elem.image } }))
      ]
  })
}