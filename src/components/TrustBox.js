// import React, { useEffect, useRef } from 'react';

// const TrustBox = () => {
//     // Create a reference to the div where the widget will live
//     const ref = useRef(null);

//     useEffect(() => {
//         // If window.Trustpilot is available, load the widget
//         if (window.Trustpilot) {
//             window.Trustpilot.loadFromElement(ref.current);
//         }
//     }, []);

//     return (
//         <div
//             ref={ref} // Assign the ref to this element
//             className="trustpilot-widget"
//             data-locale="en-US"
//             data-template-id="YOUR_TEMPLATE_ID"
//             data-businessunit-id="YOUR_BUSINESS_UNIT_ID"
//             data-style-height="150px"
//             data-style-width="100%"
//             data-theme="light"
//         >
//             <a
//                 href="https://www.trustpilot.com/review/yourdomain.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//             >
//                 Trustpilot
//             </a>
//         </div>
//     );
// };

// export default TrustBox;