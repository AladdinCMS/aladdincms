import { useEffect } from "react";

const Favicon = () => {
    useEffect(() => {
        document.title = "My Awesome Website"; // Set page title

        // Change favicon dynamically
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = "https://www.greenteam.org.uk/wp-content/uploads/2020/05/gt-logo-landscapex2-01.png";
        }
    }, []);

    return (
        <div>
            <h1>Welcome to My Website</h1>
        </div>
    );
};

export default Favicon;