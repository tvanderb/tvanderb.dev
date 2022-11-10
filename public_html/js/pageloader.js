function PLLoadRecentPosts(elementId, resourceId) {
    const list = document.getElementById(elementId);
    const resource = list.getAttribute("pageloader-resource-id");
    
    if (!resource) {
        console.error(`pageloader: element={${elementId}} Was not provided with a resource ID by attribute or parameter.`);
        return;
    }

    fetch(`/resources/${resource}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`pageloader: element={${elementId}} resource={${resource}} Received nonstandard HTTP status: ${response.status}`);
            }

            return response.text();
        })
        .then((data) => {
            let json;
            try {
                json = JSON.parse(data);
            } catch (error) {
                throw new Error(`pageloader: element={${elementId}} resource={${resource}} Resource contains invalid JSON data`)
            }

            if (json) {
                try {
                    json["posts"].forEach((post) => {
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        a.setAttribute("href", `/posts/${post.id}`);
                        a.setAttribute("target", "_blank");
                        a.text = post.date;

                        li.appendChild(a);
                        list.appendChild(li);
                    })
                } catch (_) {}
            }
        })
        .catch((error) => { throw new Error(`pageloader: element={${elementId}} resource={${resource}} An error occurred during resource request.`)})
}