import {
  RenderCount,
  BasePerformanceData
} from '@speedsters/type';
import { hasPerformanceIssue } from 'Utils';

type CheckPerformanceIssue = {
  byPerformance: {
    applicationName: string;
    count: number;
  };
  totalIssues: number;
}

type CheckPerformance = CheckPerformanceIssue | null;

export default (performances: any): Promise<CheckPerformance> => new Promise(resolve => {
  let byPerformance: any = {};
  let totalIssues = 0;

  function checkPerformances(performance: any, applicationName: string) {
    
    performance.data.forEach((item: BasePerformanceData & any) => {
      if (item && item.hasOwnProperty('milliseconds')) {
        if (item.milliseconds && hasPerformanceIssue(item.value, item.milliseconds) ) {
          totalIssues++;
          byPerformance[applicationName].count++;
        }
      } else if (item && item.name && item.name === 'renderCount') {
        const reactCount = item as RenderCount;
        reactCount.timeline.forEach(x => {
          if (x.milliseconds && hasPerformanceIssue(x.timing, x.milliseconds)) {
            totalIssues++;
            byPerformance[applicationName].count++;
          }
        })
      } else if (item && item.data && Array.isArray(item.data)) {
        checkPerformances(item, applicationName);
      }
    });
  }

  performances.forEach((performance: any) => {
    const { applicationName } = performance;

    byPerformance[applicationName] = {
      applicationName,
      count: 0, 
    };

    checkPerformances(performance, applicationName);
  });

  if (totalIssues) {
    resolve({
      byPerformance,
      totalIssues,
    });
  } else {
    resolve(null);
  }
});