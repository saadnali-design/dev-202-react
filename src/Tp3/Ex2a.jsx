export default function Ex2a(props) {
    return (
        <div>
            {props.value === '' ? (
                <div>Aujourd'hui, je ne ressens aucune humeur.</div>
            ) : (
                <div style={{ backgroundColor: props.color }}>
                    Aujourd'hui, je me sens {props.label}.
                </div>
            )}
        </div>
    );
}