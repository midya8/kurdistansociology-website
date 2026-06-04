import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return { title: dict.bylaw.title };
}

const articles = [
  {
    n: "Article 1",
    title: "Name, Nature, and Foundational Principles",
    body: [
      "The name of the organization is the Kurdistan International Sociological Association (KISA).",
      "KISA is a non-profit, non-partisan, independent, and scholarly association organized under the laws of Canada.",
      "KISA is established exclusively for educational, scholarly, research, and professional purposes and shall not operate for private gain.",
      "KISA shall remain independent of political parties, governments, armed groups, and partisan organizations. Participation by individuals with political views or affiliations shall not, in itself, disqualify membership, but KISA as an institution shall not endorse, campaign for, or function as an arm of any political party, faction, or government.",
      "KISA shall promote professional sociology, academic freedom, critical inquiry, ethical research, scholarly dialogue, publication, teaching, and public education relating to Kurdistan, Kurdish societies, and broader sociological questions in regional and international contexts.",
      "KISA shall be guided by the principles of: (a) academic freedom; (b) scholarly integrity; (c) non-partisanship; (d) institutional independence; (e) equity, diversity, and inclusion; (f) mutual respect and collegiality; and (g) democratic participation and transparency.",
      "No part of the income or assets of KISA shall be distributed to members, directors, or officers for personal benefit, except for reasonable compensation for services rendered and reimbursement of authorized expenses.",
    ],
  },
  {
    n: "Article 2",
    title: "Objects and Activities",
    body: [
      "The objects of KISA are to advance sociological knowledge and research; support professional development in sociology; organize conferences, seminars, workshops, lectures, and scholarly meetings; encourage publications, collaborative research, and academic exchange; support sociological teaching and mentoring, including for students and early-career scholars; foster international scholarly cooperation among Kurdish and non-Kurdish sociologists and researchers; and contribute to informed public understanding of social issues through rigorous and professional scholarship.",
      "In pursuing its objects, KISA shall not engage in partisan political campaigning or endorse candidates or political parties.",
      "KISA may issue scholarly statements, reports, or public interventions on matters relevant to sociology, academic freedom, human rights, democracy, social justice, and the social conditions of communities, provided that such interventions are consistent with its non-partisan and scholarly character.",
    ],
  },
  {
    n: "Article 3",
    title: "Membership",
    body: [
      "KISA shall have the following categories of membership: (a) Regular Members; (b) Student Members; (c) Institutional or Collective Members; and (d) Honorary Members.",
      "Membership is open to persons or institutions that support the objects and principles of KISA.",
      "Regular and Student Members in good standing shall have voting rights. Institutional or Collective Members and Honorary Members may participate in KISA activities but shall have voting rights only if so determined by Board-approved policy.",
      "A member is in good standing when the member meets the eligibility criteria, has paid any required dues, and is not suspended or expelled.",
      "The Board may approve or reject membership applications in accordance with fair, transparent, and non-discriminatory criteria.",
      "Membership in KISA shall not require adherence to any political ideology, party, faction, or governmental line.",
      "A member may resign by written notice. A member may be suspended or expelled for serious misconduct after written notice and a fair opportunity to respond.",
    ],
  },
  {
    n: "Article 4",
    title: "Annual and Special Meetings of Members",
    body: [
      "KISA shall hold one Annual General Meeting each calendar year.",
      "Special meetings may be called by the Board or upon written request of at least ten percent of voting members.",
      "Notice of any meeting shall be provided at least twenty-one (21) days in advance.",
      "Meetings may be held in person, electronically, or in hybrid form.",
      "The quorum for a meeting shall be twenty percent (20%) of voting members or fifteen (15) voting members, whichever is lower.",
      "Unless otherwise required, decisions shall be made by a simple majority of votes cast.",
    ],
  },
  {
    n: "Article 5",
    title: "Board of Directors",
    body: [
      "The affairs of KISA shall be governed by a Board of Directors of not fewer than seven (7) and not more than eleven (11) directors, including officers.",
      "The composition of the Board should, as far as reasonably possible, reflect diversity in gender, geography, generation, scholarly field, and institutional affiliation.",
      "Directors shall be elected for terms of two (2) years and may be re-elected once consecutively.",
      "The Board shall be responsible for overall governance and strategic direction; protection of KISA's independence and non-partisan character; oversight of programs, conferences, publications, and partnerships; financial stewardship; and adoption of policies consistent with this bylaw.",
      "A quorum for Board meetings shall be a majority of directors then in office. The Board may meet in person or electronically. A vacancy may be filled by Board appointment until the next election.",
    ],
  },
  {
    n: "Article 6",
    title: "Officers",
    body: [
      "The officers of KISA shall be: (a) President; (b) Vice-President; (c) Secretary; (d) Treasurer; and five Academic Advisory Board Members.",
      "The President shall provide leadership, preside at meetings, and represent KISA in accordance with its objects and principles.",
      "The Vice-President shall assist the President and act in the President's place when necessary.",
      "The Secretary shall keep minutes, records, notices, and corporate documents.",
      "The Treasurer shall oversee finances, accounts, and financial reporting.",
      "The Academic Advisory Board Members shall lead the academic and research committees.",
      "Officers shall serve for two-year terms. No officer shall publicly commit KISA to a partisan position unless expressly authorized by the Board.",
    ],
  },
  {
    n: "Article 7",
    title: "Committees",
    body: [
      "The Board may establish standing or ad hoc committees, including: Membership and Outreach; Conference and Program; Publications and Communications; Nominations and Elections; and Equity, Ethics, and Professional Conduct.",
      "Committees shall operate under terms of reference approved by the Board and shall support KISA's scholarly mission, not partisan mobilization.",
    ],
  },
  {
    n: "Article 8",
    title: "Nominations and Elections",
    body: [
      "Elections shall be held in accordance with procedures approved by the Board.",
      "A Nominations and Elections Committee shall invite nominations from the membership, including self-nominations.",
      "Elections may be conducted electronically. Where there is more than one candidate, the candidate receiving the highest number of votes shall be elected.",
      "Election procedures shall promote fairness, transparency, inclusion, and scholarly professionalism.",
    ],
  },
  {
    n: "Article 9",
    title: "Finances and Execution of Documents",
    body: [
      "The fiscal year of KISA shall be determined by the Board. The Board may set membership dues.",
      "KISA shall maintain accurate financial records and present annual financial statements to the membership.",
      "Contracts, banking documents, and official instruments shall be signed by any two (2) authorized officers or directors.",
      "KISA funds shall be used solely for the objects of the association and in accordance with nonprofit law.",
    ],
  },
  {
    n: "Article 10",
    title: "Conflict of Interest, Ethics, and Professional Conduct",
    body: [
      "Directors, officers, and committee members shall disclose any real, potential, or perceived conflict of interest. A person in conflict shall not participate in decision-making on the matter.",
      "KISA shall uphold standards of professional conduct consistent with scholarly ethics, respectful dialogue, non-discrimination, and academic integrity.",
      "KISA may adopt policies concerning conflict of interest, harassment, discrimination, research ethics, public statements, and professional conduct.",
      "Conduct that attempts to subordinate KISA to partisan interests, personal political agendas, or external control shall be contrary to this bylaw.",
    ],
  },
  {
    n: "Article 11",
    title: "Amendments",
    body: [
      "Amendments may be proposed by the Board or by at least ten percent (10%) of voting members.",
      "Notice of a proposed amendment shall be circulated to members at least twenty-one (21) days before the meeting or vote.",
      "An amendment shall require approval by two-thirds (2/3) of votes cast at a duly called meeting or valid electronic ballot.",
    ],
  },
  {
    n: "Article 12",
    title: "Dissolution",
    body: [
      "KISA may be dissolved by a two-thirds (2/3) vote of voting members at a special meeting called for that purpose.",
      "Upon dissolution, after payment of liabilities, the remaining assets shall be transferred to one or more nonprofit educational or scholarly organizations with similar purposes.",
    ],
  },
];

export default async function BylawPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  void locale;
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{dict.bylaw.title}</h1>
        <p className="mt-3 text-lg text-muted italic">{dict.bylaw.subtitle}</p>
        <p className="mt-6 text-foreground/80 leading-relaxed">{dict.bylaw.lead}</p>
        <p className="mt-3 text-xs text-muted">Adopted by the Members of KISA · President: F. Rahmani</p>
      </header>
      <div className="space-y-10">
        {articles.map((a) => (
          <section key={a.n} className="border-s-2 border-accent ps-6">
            <div className="text-xs uppercase tracking-[0.18em] text-accent mb-2">{a.n}</div>
            <h2 className="font-serif text-xl mb-4">{a.title}</h2>
            <ol className="space-y-3 text-foreground/80 leading-relaxed list-decimal list-inside marker:text-muted">
              {a.body.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </article>
  );
}
