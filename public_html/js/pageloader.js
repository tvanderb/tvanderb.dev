function PLFetchResource(elementId, resourceId, callback) {
    fetch(`/resources/${resourceId}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} Received nonstandard HTTP status: ${response.status}`);
            }

            return response.text();
        })
        .then((data) => {
            let json;
            try {
                json = JSON.parse(data);
            } catch (error) {
                throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} Resource contains invalid JSON data`)
            }

            callback(json);
        })
        .catch((_) => { throw new Error(`pageloader: element={${elementId}} resource={${resourceId}} An error occurred during resource request.`)});
}

function PLLoadRecentPosts(elementId, resourceId) {
    const list = document.getElementById(elementId);
    let resource = list.getAttribute("pageloader-resource-id");
    
    if (!resource && !resourceId) {
        console.error(`pageloader: element={${elementId}} Was not provided with a resource ID by attribute or parameter.`);
        return;
    } else if (!resource && resourceId) {
        resource = resourceId;
    }

    PLFetchResource(elementId, resource, (json) => {
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
    });
}