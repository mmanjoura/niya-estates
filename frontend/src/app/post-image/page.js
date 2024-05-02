'use client';
import Layout from "@/components/Layout";
import ProtectAdminRoute from "@/components/utils/ProtectAdminRoute";
import { usePropertiesData } from "../../data/properties_data";
import PropertiesList from "@/components/utils/PropertiesList";
import { BreadCrumbs } from "@/components/common/bread-crumb";
import { Tabs, Tab } from 'react-bootstrap';
import UploadAgentImage from "@/components/dashboard/images/agent";
import UploadFloorImage from "@/components/dashboard/images/floor-plan";
import UploadPropertyImages from "@/components/dashboard/images/property";

export default function PostProperty() {
  const user = ProtectAdminRoute();
  const properties = usePropertiesData();


  return (

    
      <Layout>
        {/* Start Main Content */}
        <div className="main-content">
        <div className="border-bottom py-3">
          <div className="container">
            {/* Start Breadcrumbs */}
            <BreadCrumbs  />
            {/* End Breadcrumbs */}
          </div>
        </div>
   
          {/* Tabs */}
          <div className="container"> {/* Center tabs */}
            <Tabs defaultActiveKey="propertyImages" id="tabs">
              {/* Property Images Tab */}
              <Tab eventKey="propertyImages" title="1. Property">
                <div className="py-5">
                  <div className="container py-4">
                    {/* Property Images Content */}
                    {/* Your existing Property Images content goes here */}
                    <UploadPropertyImages PropertiesList = {PropertiesList} properties = {properties} user = {user}/>
                  </div>
                </div>
              </Tab>
              {/* Floor Plan Tab */}
              <Tab eventKey="floorPlan" title="2. Floor Plan">
                <div className="py-5">
                  <div className="container py-4">
                    {/* Floor Plan Content */}
                    {/* Your existing Floor Plan content goes here */}
                    <UploadFloorImage PropertiesList = {PropertiesList} properties = {properties} user = {user}/>
                  </div>
                </div>
              </Tab>
              {/* Agent Image Tab */}
              <Tab eventKey="agentImage" title="3. Agent">
                <div className="py-5">
                  <div className="container py-4">
                    {/* Agent Image Content */}
                    {/* Your existing Agent Image content goes here */}
                    <UploadAgentImage PropertiesList = {PropertiesList} properties = {properties} user = {user}/>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Layout>


  );
}