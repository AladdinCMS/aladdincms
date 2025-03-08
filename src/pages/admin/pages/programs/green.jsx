import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Leaf,
    Heart,
    Award,
    Menu, // Import Menu icon for mobile navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState for mobile menu

export default function GreenVolunteersPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-green-50 border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <Typography variant="h5" color="green">
                            Green Team
                        </Typography>
                    </div>
                    <nav
                        className={`md:flex gap-6 ${isMobileMenuOpen ? "flex flex-col absolute top-full left-0 w-full bg-green-50 z-10 p-4 border-b" : "hidden"
                            }`}
                    >
                        <Typography
                            as={Link}
                            to="/"
                            color="green"
                            className="hover:text-green-600"
                        >
                            Home
                        </Typography>
                        <Typography
                            as={Link}
                            to="/about"
                            color="green"
                            className="hover:text-green-600"
                        >
                            About Us
                        </Typography>
                        <Typography
                            as={Link}
                            to="/programs"
                            color="green"
                            className="hover:text-green-600 font-medium"
                        >
                            Our Programmes
                        </Typography>
                        <Typography
                            as={Link}
                            to="/volunteer"
                            color="green"
                            className="hover:text-green-600"
                        >
                            Get Involved
                        </Typography>
                        <Typography
                            as={Link}
                            to="/contact"
                            color="green"
                            className="hover:text-green-600"
                        >
                            Contact
                        </Typography>
                    </nav>
                    <IconButton
                        variant="text"
                        className="md:hidden"
                        onClick={toggleMobileMenu}
                    >
                        <Menu className="h-6 w-6 text-green-600" />
                    </IconButton>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative">
                    <div className="absolute inset-0 bg-green-900/70 z-10" />
                    <img
                        src="/placeholder.svg?height=400&width=1200"
                        alt="Volunteers working in nature"
                        className="w-full h-[300px] md:h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                        <div className="container px-4">
                            <Typography variant="h2" color="white" className="font-bold">
                                Green Volunteers
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="max-w-2xl mx-auto"
                            >
                                Join our community of passionate volunteers dedicated to
                                creating a greener, more sustainable future.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Breadcrumb */}
                <div className="bg-green-50 py-3">
                    <div className="container mx-auto px-4">
                        <Typography variant="small" color="green">
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>{" "}
                            &gt;
                            <Link to="/our-programmes" className="hover:underline mx-1">
                                Our Programmes
                            </Link>{" "}
                            &gt; <span className="font-medium">Green Volunteers</span>
                        </Typography>
                    </div>
                </div>

                {/* Main Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-8">
                                {/* About Green Volunteers */}
                                <Card>
                                    <CardHeader>
                                        <Typography variant="h3" color="green">
                                            About Green Volunteers
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <Typography variant="paragraph" className="text-gray-700">
                                            Our Green Volunteers programme offers a unique opportunity
                                            for individuals to contribute to environmental
                                            conservation.
                                        </Typography>
                                        <Typography variant="paragraph" className="text-gray-700">
                                            Whether you're passionate about gardening, wildlife
                                            conservation, or sustainability, there's a place for you.
                                        </Typography>
                                        <Typography variant="paragraph" className="text-gray-700">
                                            By joining, you'll develop new skills, meet like-minded
                                            people, and make a real impact.
                                        </Typography>
                                    </CardBody>
                                </Card>

                                {/* Volunteer Activities */}
                                <Typography variant="h3" color="green">
                                    What Our Volunteers Do
                                </Typography>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        {
                                            icon: MapPin,
                                            title: "Community Gardens",
                                            text: "Help maintain and develop community gardens.",
                                        },
                                        {
                                            icon: Leaf,
                                            title: "Tree Planting",
                                            text: "Participate in tree planting initiatives.",
                                        },
                                        {
                                            icon: Users,
                                            title: "Environmental Education",
                                            text: "Lead workshops on sustainability.",
                                        },
                                        {
                                            icon: Heart,
                                            title: "Wildlife Conservation",
                                            text: "Support habitat creation and conservation.",
                                        },
                                    ].map(({ icon: Icon, title, text }) => (
                                        <Card key={title}>
                                            <CardHeader>
                                                <Typography
                                                    variant="h5"
                                                    color="green"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon className="h-5 w-5" /> {title}
                                                </Typography>
                                            </CardHeader>
                                            <CardBody>
                                                <Typography variant="paragraph" className="text-gray-600">
                                                    {text}
                                                </Typography>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <Card className="bg-green-50 border">
                                    <CardHeader>
                                        <Typography variant="h4" color="green">
                                            Join Our Team
                                        </Typography>
                                    </CardHeader>
                                    <CardBody>
                                        <Typography
                                            variant="paragraph"
                                            className="mb-4 text-gray-700"
                                        >
                                            We welcome volunteers of all backgrounds. No experience
                                            necessary!
                                        </Typography>
                                        <Button className="w-full bg-green-700">Apply Now</Button>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <Typography variant="h4" color="green">
                                            Upcoming Events
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        {[
                                            {
                                                date: "Saturday, March 16, 2025",
                                                time: "10:00 AM - 1:00 PM",
                                                location: "Oakwood Garden",
                                            },
                                            {
                                                date: "Sunday, March 24, 2025",
                                                time: "9:30 AM - 12:30 PM",
                                                location: "Riverside Park",
                                            },
                                        ].map(({ date, time, location }, idx) => (
                                            <div key={idx}>
                                                <Typography variant="h6" color="green">
                                                    {date}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Clock className="h-4 w-4/> {time}
                                                    4" /> {time}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center gap-2"
                                                >
                                                    <MapPin className="h-4 w-4" /> {location}
                                                </Typography>
                                            </div>
                                        ))}
                                        <Button variant="outlined" className="w-full">
                                            View All Events
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-green-800 text-white py-6 text-center">
                <Typography variant="small" color="white">
                    &copy; {new Date().getFullYear()} Green Team. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
}