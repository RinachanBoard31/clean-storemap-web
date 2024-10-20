// str.includes()の複数バージョン(一つでも当てはまればTrueを返す)
function includesAny(msg: string , ...keys: Array<string>) :Boolean{ // 複数の値がincludeできるかを確認する
  return keys.some(key => msg.includes(key))
}

export default {
  includesAny
}