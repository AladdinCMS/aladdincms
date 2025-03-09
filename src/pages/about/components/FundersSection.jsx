import br from "../../../assets/blackrock.webp"
import bg from "../../../assets/Baillie-Gifford-1.webp"
import tcec from "../../../assets/The-City-of-Edinburgh-Council-e1655397319239.webp"
import fs from "../../../assets/Foundation-Scotland.webp"
import tgt from "../../../assets/The-Gannochy-trust.webp"



function FundersSection() {
  const funders = [
    {
      id: 1,
      name: "Baillie Gifford",
      logo: bg,
    },
    {
      id: 2,
      name: "BlackRock",
      logo: br,
    },
    {
      id: 3,
      name: "The City of Edinburgh Council",
      logo: tcec,
    },
    {
      id: 4,
      name: "Foundation Scotland",
      logo: fs,
    },
    {
      id: 5,
      name: "The Gannochy Trust",
      logo: tgt,
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Our Funders
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Supporting our mission</h2>
        </div>

        <div className="mb-10 rounded-xl bg-green-50 p-6 md:p-8">
          <p className="mb-6 text-gray-700">
            We are only able to run our programmes because of the financial support that we have received and continue
            to receive from funders and donors – our thanks goes out to them all.
          </p>

          <div className="mb-6 rounded-lg bg-white p-4 md:p-6">
            <p className="mb-4 text-gray-700">
              Should you wish to find out more about funding the Green Team, our funders or our fundraising policy then
              please contact our Business Development Manager, Jamie:
            </p>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:jamie.leitch@greenteam.org.uk" className="text-green-600 hover:underline">
                jamie.leitch@greenteam.org.uk
              </a>
            </div>
          </div>

          <p className="mb-4 text-gray-700">
            The Green Team takes its responsibilities around funding very seriously. We take reasonable and
            proportionate measures to ensure the work or activities of any funder has no clear and significant negative
            impact upon the vision, mission and values of the Green Team.
          </p>

          <p className="text-gray-700">
            While we are grateful for all funding that we are offered, acceptance of funding does not imply an
            endorsement of the work or activities of a funder.
          </p>
        </div>

        <div className="mb-8 text-center">
          <h3 className="mb-8 text-xl font-semibold text-gray-900">
            We are grateful to have received grant funding for our current work from:
          </h3>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {funders.map((funder) => (
              <div key={funder.id} className="flex flex-col items-center">
                <div className="mb-3 flex h-24 w-full items-center justify-center rounded-md bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <img
                    src={funder.logo || "/placeholder.svg"}
                    alt={`${funder.name} logo`}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600">{funder.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FundersSection

