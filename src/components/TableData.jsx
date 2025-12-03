const TableData = ({ data = [], headers = [], actions = [] }) => {
  if (data.length === 0) {
    return <p className="text-center py-4">No hay registros para mostrar.</p>;
  }

  return (
    <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr className="bg-gray-100 text-black">
          {headers.map((head) => (
            <th
              key={head.name} // usamos el name como key
              className="border border-gray-300 px-4 py-2"
            >
              {head.label}
            </th>
          ))}
          {actions.length > 0 && (
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id || item.categorieId} // ID único de cada fila
            className="hover:bg-gray-50"
          >
            {headers.map((head) => (
              <td
                key={`${item.id || item.categorieId}-${head.name}`} // key única por fila+header
                className="border border-gray-300 px-4 py-2"
              >
                {head.pipe ? head.pipe(item[head.name]) : item[head.name]}
              </td>
            ))}
            {actions.length > 0 && (
              <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                {actions.map((act, idx) => (
                  <span key={`${item.id || item.categorieId}-action-${idx}`}>
                    {act.content(item)}
                  </span>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;