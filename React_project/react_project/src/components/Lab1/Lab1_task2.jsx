import "./Lab1.css"

export function StocksTable() {
    const data = [ {
        stock_name: "EFX",
        company_name: "Equifax Inc",
        price: 163.55,
        currency: "USD",
        change: "+9.03"
    }, {
        stock_name: "IRM",
        company_name: "Iron Mountain Inc",
        price: 33.21,
        currency: "USD",
        change: "+1.42"
    }, {
        stock_name: "NTAP",
        company_name: "NetApp Inc",
        price: 54.81,
        currency: "USD",
        change: "-6.01"
    }, {
        stock_name: "CTL",
        company_name: "Centurylink Inc",
        price: 13.79,
        currency: "USD",
        change: "-1.37"
    } ]

  return (
    <div className="container">
      <h1>Котировки акций</h1>
      <table>
        <thead>
          <tr>
            <th>Тикер</th>
            <th>Компания</th>
            <th>Цена</th>
            <th>Валюта</th>
            <th>Изменение</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => (
            <tr key={index}>
              <td>{el.stock_name}</td>
              <td>{el.company_name}</td>
              <td>{el.price.toFixed(2)}</td>
              <td>{el.currency}</td>
              <td className={el.change.startsWith('+') ? 'positive' : 'negative'}>
                {el.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}