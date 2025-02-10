
export default function Loading() {
    return (
        <button className="btn btn-primary position-absolute top-50 start-50" type="button" disabled>
        <span role="status">Loading</span>
        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
        </button>
    );
}