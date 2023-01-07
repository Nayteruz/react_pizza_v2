
const isEqualProduct = (o1, o2) => {
	return o1.imageUrl === o2.imageUrl
		&& o1.title === o2.title
		&& o1.price === o2.price
		&& o1.size === o2.size
		&& o1.type === o2.type;
}

export default isEqualProduct;