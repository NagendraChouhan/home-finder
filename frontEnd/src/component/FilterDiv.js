import React from "react";


const FilterDiv = (props) => {
  const [formData, setFormData] = React.useState({
    roomtype: "",
    price: 100000,
    pg: false,
    // Bed: false,
    // Table: false,
    // Almirah: false,
    // wifi: false,
    // packing: false,
    // Ventilation: false,
    Boys: true,
    Girls: true,
    Famaly: true,
    sortBy:1
  });
  const handelOnChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((perFormData) => ({
      ...perFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = async () => {
    console.log("Form is ready to submit");
    console.log(`from CreateRoom=====${JSON.stringify(formData)}`);
    let data = await fetch("/brooms/filter", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-Type": "application/json",
      },
    });
    data = await data.json();
    props.setBlockDatafun(data);
    // setBlockData(data)
    console.log(`data===== ${JSON.stringify(data)}`);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Filter Submited")

    submitForm();
  };

  const filterHeading = {
    fontSize: "larger",
    fontWeight: "bold",
    margin: "4%",
    textAlign: "start",
    display: "block",
  };
  const filterFormButon = {
    padding: "10px 20px",
    borderRadius: "2px",
    width: "90%",
    margin: "14px 10px",
    color: "black",
    fontSize: "larger",
  };

  return (
    <>
      <div>
        <div className="form-div">
          <span style={filterHeading}>Filter</span>
        </div>
        <div>
          <form onSubmit={handleOnSubmit}>
            <select
              name="roomtype"
              value={formData.roomtype}
              onChange={handelOnChange}
              style={{ width: "90%" }}
            >
              <option value="">Type of Room*</option>
              <option value="Single Room">Single Room</option>
              <option value="1RK">1 RK</option>
              <option value="1BHK">1 BHK</option>
              <option value="2BHK">2 BHK</option>
              <option value="2BHK2T">2 BHK 2T</option>
              <option value="3BHK2T">3 BHK 2T</option>
              <option value="3BHK3T">3 BHK 3T</option>
            </select>
            {/* <div className="form-div">
              <label>
                <input
                  type="checkbox"
                  name="pg"
                  checked={formData.pg}
                  onChange={handelOnChange}
                />
                PG ?
              </label>
            </div> */}
            {/* <div className="form-div">
              <span>Available Things In Room</span>
              <label>
                <input
                  type="checkbox"
                  name="Bed"
                  checked={formData.Bed}
                  onChange={handelOnChange}
                />
                Bed
              </label>

              <label>
                <input
                  type="checkbox"
                  name="Table"
                  checked={formData.Table}
                  onChange={handelOnChange}
                />
                Table
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Almirah"
                  checked={formData.Almirah}
                  onChange={handelOnChange}
                />
                Almirah
              </label>
              <label>
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handelOnChange}
                />
                wifi
              </label>

              <label>
                <input
                  type="checkbox"
                  name="packing"
                  checked={formData.packing}
                  onChange={handelOnChange}
                />
                Packing Space
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Ventilation"
                  checked={formData.Ventilation}
                  onChange={handelOnChange}
                />
                Ventilation in Room
              </label>
            </div> */}
            <div className="form-div" >
              <span>Price is between 0 and {formData.price}</span>
              <input
                className="price-range"
                type="range"
                name="price"
                min="0"
                max="100000"
                step={1}
                onChange={handelOnChange}
                value={formData.price}
                style={{ width: "90%" }}
              />
            </div>
            {/*
            <div className="form-div">
              <span>Room is Available For</span>
              <label>
                <input
                  type="checkbox"
                  name="Boys"
                  checked={formData.Boys}
                  onChange={handelOnChange}
                />
                Boys
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Girls"
                  checked={formData.Girls}
                  onChange={handelOnChange}
                />
                Girls
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Famaly"
                  checked={formData.Famaly}
                  onChange={handelOnChange}
                />
                Family
              </label>
            </div> */}
            <div className="form-div">
              <span style={filterHeading}>Sort By</span>
              <label>
                {" "}
                <input
                  type="radio"
                  name="sortBy"
                  value={1}
                  onChange={handelOnChange}
                />
                Price Low-High
              </label>
              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value={-1}
                  onChange={handelOnChange}
                />
                Price High-Low
              </label>
            </div>
            <div className="button-div">
              <button style={filterFormButon} type="submit">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterDiv;
