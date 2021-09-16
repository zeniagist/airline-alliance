import styles from "./styles.module.css";

function AirlineCard({
  onMouseEnter,
  onMouseLeave,
  isHovering,
  logoURL,
  name,
  alliance,
  phone,
  site
}) {
  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="contentCard"
    >
      {/* Airline Logo */}
      <article className="contentItem airlineLogo">
        <img src={logoURL} alt="Airline Logo" />
      </article>
      {/* end of logo */}

      {/* Airline Content */}
      <article className="contentItem airlineContent">
        <div className="airlineCardContent">
          {/* Airline Name */}
          <div
            className={
              isHovering ? styles.airlineNameHover : styles.airlineName
            }
          >
            <div className="airlineName">{name}</div>
          </div>

          {/* Airline Details */}
          {isHovering && (
            <div>
              {/* Alliance Name */}
              <div className="allianceName">
                {alliance === "none" && (
                  <>
                    {/* "No Alliance Partner" added to maintain required parameters */}
                    No Alliance Partner
                  </>
                )}
                {alliance === "ST" && <>Sky Team</>}
                {alliance === "OW" && <>Oneworld</>}
                {alliance === "SA" && <>Star Alliance</>}
              </div>

              {/* Airline Number */}
              <div className="airlineNumber">
                {/* "Number Not Available" added to maintain required parameters */}
                {phone === "" ||
                phone
                  .replace(/[^-0-9A-Za-z ]/g, "")
                  .replace(/-/g, " ")
                  .split(" ")
                  .join("").length < 3 ? (
                  "Number Not Available"
                ) : (
                  <>
                    + {phone.replace(/[^-0-9A-Za-z ]/g, "").replace(/-/g, " ")}
                  </>
                )}
              </div>

              {/* Airline URL */}
              <div className="airlineUrl">
                {site.replace(/(http(s)?:\/\/)|(www\.)|(\/.*){1}/g, "")}
              </div>
            </div>
          )}
          {/* end of airline details */}
        </div>
      </article>
      {/* end of airlne content details */}
    </section>
  );
}

export default AirlineCard;
