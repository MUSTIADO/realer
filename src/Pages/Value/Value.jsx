import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion.jsx";
import "./Value.css";

const Value = () => {
  const [expandedItems, setExpandedItems] = useState([0]); // State to track expanded items

  const toggleAccordion = (index) => {
    // Function to toggle an accordion item's expanded state
    const currentIndex = expandedItems.indexOf(index);
    if (currentIndex === -1) {
      setExpandedItems([...expandedItems, index]);
    } else {
      const newExpandedItems = [...expandedItems];
      newExpandedItems.splice(currentIndex, 1);
      setExpandedItems(newExpandedItems);
    }
  };

  return (
    <section id="value" className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* Left side */}
        <div className="v-left">
          <div className="image-container">
            <img src="./valuee.jpeg" alt="" />
          </div>
        </div>

        {/* Right side */}
        <div className="flexColStart v-right">
          <span className="orangeText">What We Offer</span>
          <span className="primaryText">The Magic We Bring to Your Doorstep</span>
          <span className="secondaryText">
          We're committed to offering you exceptional service at all times.
            <br />
            A well-chosen residence enriches your living experience.
          </span>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={expandedItems}
          >
            {data.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton
                    className="flexCenter accordionButton"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flexCenter icon">{item.icon}</div>
                    <span className="primaryText">{item.heading}</span>
                    <div className="flexCenter icon">
                      <MdOutlineArrowDropDown size={20} />
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p className="secondaryText">{item.detail}</p>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
