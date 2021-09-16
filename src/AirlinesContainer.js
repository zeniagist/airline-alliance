import { React, Component } from "react";
import fetchJsonp from "fetch-jsonp";

// import AllianceFilters from "./AllianceFilters";
import AirlineCard from "./AirlineCard";

class AirlinesContainer extends Component {
  state = {
    airlineList: [],
    filterList: [
      {
        id: 1,
        name: "Oneworld",
        allianceValue: "OW"
      },
      {
        id: 2,
        name: "Sky Team",
        allianceValue: "ST"
      },
      {
        id: 3,
        name: "Star Alliance",
        allianceValue: "SA"
      }
    ],
    activeFilter: [],
    isHovered: {}
  };

  // checkbox filters
  onFilterChange(filter) {
    const { activeFilter } = this.state;
    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      this.setState({ activeFilter: newFilter });
    } else {
      this.setState({ activeFilter: [...activeFilter, filter] });
    }
  }

  // mouse hover over airline card
  handleMouseEnter = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: true } };
    });
  };

  // after mouse hovers over airline card
  handleMouseLeave = (index) => {
    this.setState((prevState) => {
      return { isHovered: { ...prevState.isHovered, [index]: false } };
    });
  };

  // fetch airline data from JSON
  componentDidMount() {
    let url = "https://www.kayak.com/h/mobileapis/directory/airlines/homework";
    fetchJsonp(url, {
      jsonpCallback: "jsonp"
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          airlineList: result
        });
      });
  }

  render() {
    const { filterList, activeFilter, isHovered } = this.state;

    let filteredList;

    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length // show all items when nothing is checked
    ) {
      filteredList = this.state.airlineList;
    } else {
      filteredList = this.state.airlineList.filter(
        (item) => this.state.activeFilter.includes(item.alliance) // filter by alliance name
      );
    }

    return (
      <div>
        <div className="airlinesContainer">
          {/* Alliance Filter */}
          <div className="filterTitle">Filter by Alliances</div>
          <ul className="filterContainer">
            {this.state.filterList.map((filter) => (
              <li className="filterList">
                <input
                  id={filter.id}
                  type="checkbox"
                  onClick={() => this.onFilterChange(filter.allianceValue)}
                />
                <label htmlFor={filter.id}>{filter.name}</label>
              </li>
            ))}
          </ul>

          {/* Airline List */}
          <div className="contentContainer">
            {filteredList.map((item, index) => (
              <div key={item.code}>
                <AirlineCard
                  onMouseEnter={() => this.handleMouseEnter(index)}
                  onMouseLeave={() => this.handleMouseLeave(index)}
                  isHovering={isHovered[index]}
                  logoURL={"https://www.kayak.com/" + item.logoURL}
                  name={item.name}
                  alliance={item.alliance}
                  phone={item.phone}
                  site={item.site}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AirlinesContainer;
