import Page from "../page/Page";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FormComponent from '../form/Form';

import "./mainPage.css";


const MainPage = () => {

   return (
      <div className="main-page">
         <ErrorBoundary>
            <Page />
         </ErrorBoundary>
         <div className="filter">
            <FormComponent classes={'filter-form'} />
         </div>
      </div>

   )
};

export default MainPage;