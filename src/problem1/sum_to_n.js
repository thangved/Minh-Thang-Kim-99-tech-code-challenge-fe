var sum_to_n_a = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_a(n - 1);
};

var sum_to_n_b = function (n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
