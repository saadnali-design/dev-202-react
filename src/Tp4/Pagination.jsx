
export default function Pagination(props) {
    const pages = [];

    for (
        let i = 1;
        i <= Math.ceil(props.totalRecettes / props.recettesParPage);
        i++
    ) {
        pages.push(i);
    }

    if (pages.length <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => props.changerPage(p)}
                    className={props.pageActuelle === p ? "active" : ""}
                >
                    {p}
                </button>
            ))}
        </div>
    );
}
