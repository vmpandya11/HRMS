// import React, { useState } from 'react';
// import { FaGlobe } from 'react-icons/fa';
// import { useTranslation } from 'react-i18next';

// const Header = () => {
//     const { t, i18n } = useTranslation();
//     const [isLanguageSelectorVisible, setLanguageSelectorVisible] = useState(false);

//     const handleLanguageSelect = (event) => {
//         const selectedLanguage = event.target.value;
//         i18n.changeLanguage(selectedLanguage);
//     };

//     const toggleLanguageSelector = () => {
//         setLanguageSelectorVisible(!isLanguageSelectorVisible);
//     };

//     return (
//         <div>
//             <nav className="main-header navbar navbar-expand">
//                 <ul className="navbar-nav">
//                     <li className="nav-item">
//                         <div className="globe-icon" onClick={toggleLanguageSelector}>
//                             <FaGlobe size={20} style={{ marginRight: '5px' }} />
//                         </div>
//                         {isLanguageSelectorVisible && (
//                             <select className="language-selector" onChange={handleLanguageSelect}>
//                                 <option value="en">English</option>
//                                 <option value="hi">Hindi</option>
//                                 <option value="gu">Gujarati</option>
//                             </select>
//                         )}
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Header;

import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [isLanguageSelectorVisible, setLanguageSelectorVisible] = useState(false);

    const handleLanguageSelect = (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem('selectedLanguage', selectedLanguage); // Store selected language in localStorage
        i18n.changeLanguage(selectedLanguage);
    };

    const toggleLanguageSelector = () => {
        setLanguageSelectorVisible(!isLanguageSelectorVisible);
    };

    return (
        <div>
            <nav className="main-header navbar navbar-expand">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="globe-icon" onClick={toggleLanguageSelector}>
                            <FaGlobe size={20} style={{ marginRight: '5px' }} />
                        </div>
                        {isLanguageSelectorVisible && (
                            <select className="language-selector" onChange={handleLanguageSelect}>
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="gu">Gujarati</option>
                            </select>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
