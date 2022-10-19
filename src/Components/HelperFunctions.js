export function FormatHelper(format, input) {
    let output = "";
    switch (format) {
        case "date":
            let dte = new Date(Date.parse(input));
            let M =	dte.getMonth() + 1;
	        let d =	dte.getDate();
	        if (d <= 9) {
		        d =	"0" + d;
	        }
            if (M <= 9) {
		        M =	"0" + M;
	        }
            output = d + "." + M + "." + dte.getFullYear();
            break;
        case "currency":
            output = "€ " + input.toFixed(2).replace(".", ",");
            break;
        case "size":
            output = input + " m<sup>2</sup>";
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
            output = input.map((point) => {
                return (
                  <span className="featurepoint">{point}</span>
                );
              }
            );
            break;
        default:
            break;
    }
    return output;
}