export default function RenderRows({ paginationData, dataMapping }) {
    return paginationData.data.map((data, rowIndex) => {
        return (
            <tr key={`tr_${rowIndex}`}>
                {dataMapping.map((item, colIndex) => {
                    return (
                        <td key={`td_${colIndex}`}>
                            {item.resource(data, rowIndex)}
                        </td>
                    );
                })}
            </tr>
        );
    });
}
