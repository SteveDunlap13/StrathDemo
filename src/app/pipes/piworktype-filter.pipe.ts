
import { Pipe, PipeTransform } from '@angular/core';
import { PIWorkType } from '../models/timecardentry';


@Pipe({
    name: 'piworktypefilter',
    pure: false
})
export class PIWorkTypeFilterPipe implements PipeTransform {

    transform(items: PIWorkType[], value: string): any {

        if (!items || !value) {
            return items;
        }

        return items.filter(x => x.type === value);
    }


    /**
    * Perform the filtering
    *
    * @param {PIWorkType} piw The PIWorkType to compare to the filter.
    * @param {PIWorkType} filter The filter to apply.
    * @return {boolean} True if PIWorkType satisfies filters, false if not.
    */
    applyFilter(piw: PIWorkType, filter: PIWorkType): boolean {

        for (let field in filter) {
            if (filter[field]) {
                if (typeof filter[field] === 'string') {
                    if (piw[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                    }
                } else if (typeof filter[field] === 'number') {
                    if (piw[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
