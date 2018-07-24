import React from 'react';

import PrivateHeader from './PrivateHeader';
import ChangeLocation from './ChangeLocation';
import Weather from './Weather';

export default () => {
	return (
		<div>
			<PrivateHeader title='Weather Forecast' />
			<div className="wrapper" >
			<ChangeLocation />
			{/*<Weather location='Vadodara'/>*/}
			</div>
		</div>			
	);
};