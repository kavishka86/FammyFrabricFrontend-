//import Header from '../components/Header';

function Root() {
    return (
        <main>
           
            <div className="d-flex flex-column align-items-center pt-5">
                <p>Welcome to the order tracking system</p>
                <div>
                    <a href="/orders" className="btn btn-primary mx-2">
                        View Orders (as Customer)
                    </a>
                    <a href="/admin/orders" className="btn btn-primary mx-2">
                        View Orders (as Admin)
                    </a>
                </div>
            </div>
        </main>
    );
}

export default Root;
