function Strapper_getComponent(element, id, callback) {
    fetch(`/components/${id}.html`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`strapper: element={${element}} component={${id}} Received nonstandard HTTP status: ${response.status}`);
            }

            return response.text();
        })
        .then((text) => {
            callback(text);
        })
        .catch((_) => { throw new Error(`strapper: element={${element}} component={${id}} An error occurred during request for component.`)});
}

function Strapper_installComponents() {
    const components = document.getElementsByClassName("strapper-component");
    for (let i = 0; i < components.length; i++) {
        const component = components.item(i);
        const id = component.getAttribute("strapper-component-id");

        Strapper_getComponent(component.toString(), id, (data) => {
            component.outerHTML = data;
        });
    }
}