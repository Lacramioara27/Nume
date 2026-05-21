function Card(props) {
    return (
        <article className="simple-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </article>
    );
}

export default Card;