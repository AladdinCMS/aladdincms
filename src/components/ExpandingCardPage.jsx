import ExpandingCard from "./ExpandingCards"

const cards = [
    {
        title: "Get In Contact Now",
        description:
            "Does your organisation have a Charity of the Year? We would be delighted to be nominated and supported by you and your colleagues and would love to talk to you about what we can provide in return.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/05/charity-of-the-year-01.png",
    },
    {
        title: "Be A Green Champion",
        description:
            "An opportunity for those who are ‘young at heart’ to do some practical conservation work through employee volunteering or teambuilding.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/06/be-a-green-champion-2-01.png",
    },
    {
        title: "Donate us",
        description:
            "If you would like to make a donation to the Green Team you can do so here. From time to time we have particular fundraising campaigns or simply donate here.Your support is invaluable to us.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/05/donate-now-01.png",
    },
    {
        title: "Let Us know",
        description:
            "Thinking of running a marathon, organising a group litter pick, attempting a world record or simply staying silent for 24 hours. Any sponsored event you’d like to undertake in support of the Green Team would be amazing.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/06/donate-now_Sponsored-Challenge.png",
    },
    {
        title: "Sponsor The Green Team",
        description:
            "We would be thrilled if your organisation would like to sponsor one of our programmes and would be happy to chat about the reciprocal benefits of doing so. Get in touch for an informal chat about the possibilities.  Email Jamie.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/06/donate-now_Sponsored-Challenge-copy.png",
    },
    {
        title: "Contact US",
        description:
            "We are always looking for people to help with fundraising in the community – this could be organising a bake sale, running a quiz or helping out at a supermarket bag pack. Let us know how we can help.",
        image: "https://www.greenteam.org.uk/wp-content/uploads/2020/06/donate-now_Sponsored-Challenge-copy-2.png",
    },
]

export default function Cards() {
    return (
        <main className="container mx-auto p-4">
            <p className="text-xl pb-6">Our thanks to everyone who came along to our sponsored litter pick at Hailes Quarry Park on 22nd September. Read all about it or donate here</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <ExpandingCard key={index} title={card.title} description={card.description} image={card.image} />
                ))}
            </div>
        </main >
    )
}

