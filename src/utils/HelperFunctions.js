/**
 * Returns value from database formatted for output
 *
 * @param {string} format the desired format. Possible vales are date, currency, size, linebreak and array
 * @param {string} input the string as it comes from the database
 * @return {string} output the transformed string is returned
 */
export function FormatHelper(format, input) {
    let output = "";
    switch (format) {
        case "date":
            let dte = new Date(Date.parse(input));
            let M =	dte.getMonth() + 1;
	        let d =	dte.getDate();
            output = d.toString().padStart(2, "0") + "." + M.toString().padStart(2, "0") + "." + dte.getFullYear();
            break;
        case "currency":
            output = "€ " + input.toFixed(2).replace(".", ",");
            break;
        case "size":
            output = <>{input} m<sup>2</sup> </>;
            break;
        case "linebreak":
            output = input.split("\n").reduce((children, textSegment, index) => {
              return [
                ...children,
                index > 0 && <br key={index} />,
                textSegment,
              ];
            }, []);
            break;
        case "array":
            output = input.map((point, index) => {
                return (
                  <span className="featurepoint" key={`featurepoint_${index}`}>{point}</span>
                );
              }
            );
            break;
        default:
            break;
    }
    return output;
}