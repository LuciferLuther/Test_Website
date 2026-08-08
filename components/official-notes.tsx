import { officialSources } from "@/data/trip";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icons";

export function OfficialNotes() {
  return (
    <section className="section official-section" id="sources">
      <div className="container">
        <Reveal className="official-intro">
          <h2>What to check before paying for an event.</h2>
          <p>Some winter programmes are published late. Use the official page—not a social post—as the final answer.</p>
        </Reveal>
        <div className="official-grid">
          {officialSources.map((source, index) => (
            <Reveal key={source.href} delay={index * 0.04}>
              <a href={source.href} target="_blank" rel="noreferrer" className="official-card">
                <span>{source.status}</span>
                <strong>{source.label}</strong>
                <p>{source.note}</p>
                <i><span>Open official page</span><Icon name="arrow-right" /></i>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="photo-credit">
          Photography: Tokyo Marunouchi illumination by Dick Thomas Johnson, CC BY 2.0; Sapporo Odori Park by Nkns, CC BY-SA 3.0. Images are cropped and toned. Original harbour and onsen artwork was created for this planner.
        </p>
      </div>
    </section>
  );
}
