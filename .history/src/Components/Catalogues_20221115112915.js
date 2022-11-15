import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Summer  from './Summer';
import Winter from './Winter';
import Accessories from './Accessories';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Catalogues() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: '50px' }}>
         <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Summer" {...a11yProps(0)} />
          <Tab label="Winter" {...a11yProps(1)} />
          <Tab label="Accessories" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
        <Summer/>
        <button></button>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Winter/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Accessories/>
      </TabPanel>
    </Box>
  );
}