export class ProductData {
  /**
   * Позитивные данные для тестов на добавление количества товаров
   * @returns {[{position: number, quantity: number},{position: number, quantity: number},{position: number, quantity: number}]}
   */
  static getQuantityDataPositive() {
    return [
      {position: 1, quantity: 5},
      {position: 2, quantity: 1},
      {position: 3, quantity: 99}
    ]
  }

  /**
   * Негативные данные для тестов на добавление количества товаров
   * @returns {[{position: number, quantity: number},{position: number, quantity: number},{position: number, quantity: number},{position: number, quantity: string}]}
   */
  static getQuantityDataNegative() {
    return [
      {position: 1, quantity: -5},
      {position: 2, quantity: 0},
      {position: 3, quantity: 99999999999999999},
      {position: 1, quantity: 'dsg'}
    ]
  }
}
