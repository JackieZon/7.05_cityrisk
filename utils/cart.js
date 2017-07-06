const item = {
  id: null,
  img: null,
  name: null,
  spec: null,
  price: null,
  num: null
};

// 立即购买，保存单品信息
export function saveItem(item) {
  const data = JSON.stringify([item]);
  localStorage.setItem('item', data);
}

// 填写订单，获取单品信息
export function getItem() {
  const item = localStorage.getItem('item');
  return JSON.parse(item);
}

// 添加商品到购物车
export function addItem(item) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  // 第一次添加商品
  if (cart === null || cart === '') {
    const data = JSON.stringify([item]);
    localStorage.setItem('cart', data);
  } else {
    // 是否有该商品
    let hasItem = false;

    for(let i = 0, len = cart.length; i < len; i++) {
      if (cart[i].id === item.id) {
        cart[i].num += item.num;
        hasItem = true;
      }
    }

    // 如果没有该商品，则直接加到购物车
    if (!hasItem) {
      cart.push(item);
    }

    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  }
}

// 修改购物车中的商品数量
export function updateItem(item) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  for(let i = 0, len = cart.length; i < len; i++) {
    if (cart[i].id === item.id) {
      cart[i].num = item.num;
    }
  }

  const data = JSON.stringify(cart);
  localStorage.setItem('cart', data);
}

// 删除购物车中的商品
export function deteleItem(item) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const newCart = cart.filter(el => el.id !== item.id);
  const data = JSON.stringify(newCart);
  localStorage.setItem('cart', data);
}

// 获取购物车的商品
export function getCart() {
  const cart = localStorage.getItem('cart');
  return JSON.parse(cart);
}

// 获取购物车商品数量
export function getCartTotal() {
  let total = 0;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  for(let i = 0, len = cart.length; i < len; i++) {
    total += cart[i].num;
  }
  return total;
}

// 清空购物车
export function clearCart() {
  const data = JSON.stringify([]);
  localStorage.setItem('cart', data);
}

// 下单成功后，清除已购买商品
export function orderCart(list) {
  console.log(1);
  const cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart);
  if (cart !== null && cart !== '') {
    console.log(2);
    const newCart = cart.filter(item => {
      const res = list.findIndex(el => item.id === el.id);
      return res === -1;
    });
    console.log(3);
    const data = JSON.stringify(newCart);
    localStorage.setItem('cart', data);
  }
}
